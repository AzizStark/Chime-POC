import { Chime } from 'aws-sdk'

const chime = new Chime({ region: 'us-east-1' }) // :: has to be us-east-1 for now

/** @returns {ChimeMeetingInstance} */
async function createChimeMeeting() {
  const params = {
    ClientRequestToken: 'some-random-string-of-your-choice',
    MediaRegion: 'ap-southeast-1' // :: where your call is actually hosted
  }

  return await chime.createMeeting(params).promise()
}