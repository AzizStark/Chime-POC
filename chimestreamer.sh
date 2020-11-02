export DISPLAY=':2.0'

firefox -P foo4 --width 1920 --height 1080 --new-instance --first-startup --foreground --kiosk --ssb "https://master.d1xeue0yic9jlv.amplifyapp.com" &

ffmpeg -hide_banner -loglevel error -nostdin -s 1920x1080 -r 30 -draw_mouse 0 -f x11grab -i :2.0 -f pulse -ac 2 -i default -c:v libx264 -pix_fmt yuv420p -profile:v main -preset veryfast -x264opts "nal-hrd=cbr:no-scenecut" -minrate 3000 -maxrate 3000 -g 60 -filter_complex "adelay=delays=1000|1000" -c:a aac -b:a 160k -ac 2 -ar 44100 -f flv rtmps://3bbd23971750.global-contribute.live-video.net:443/app/sk_us-east-1_kYiEGtR1SUNe_2iPAqKRRIBQdwbLc7UFhPzLCZV1mLE
