pulseaudio -D --exit-idle-time=-1
pacmd load-module module-virtual-sink sink_name=v1  # Load a virtual sink as `v1`
pacmd set-default-sink v1  # Set the `v1` as the default sink device
pacmd set-default-source v1.monitor  # Set the monitor of the v1 sink to be the default source

Xvfb :2 -ac -screen 0 1920x1080x24 > /dev/null 2>&1 &

firefox --no-remote --new-instance --createprofile "foo4 /tmp/foo4"

mkdir -p /tmp/foo4/gmp-gmpopenh264/1.8.1.1/
pushd /tmp/foo4/gmp-gmpopenh264/1.8.1.1 >& /dev/null
curl -s -O http://ciscobinary.openh264.org/openh264-linux64-2e1774ab6dc6c43debb0b5b628bdf122a391d521.zip
unzip openh264-linux64-2e1774ab6dc6c43debb0b5b628bdf122a391d521.zip
rm -f openh264-linux64-2e1774ab6dc6c43debb0b5b628bdf122a391d521.zip
popd >& /dev/null

cat <<EOF >> /tmp/foo4/prefs.js
user_pref("media.autoplay.default", 0);
user_pref("media.autoplay.enabled.user-gestures-needed", false);
user_pref("media.navigator.permission.disabled", true);
user_pref("media.gmp-gmpopenh264.abi", "x86_64-gcc3");
user_pref("media.gmp-gmpopenh264.lastUpdate", 1571534329);
user_pref("media.gmp-gmpopenh264.version", "1.8.1.1");
user_pref("doh-rollout.doorhanger-shown", true);
EOF