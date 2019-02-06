import * as functions from 'firebase-functions';
import * as firebaseAdmin from 'firebase-admin';

firebaseAdmin.initializeApp();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
//
export const test = functions.https.onRequest((request, response) => {
  const dataType: string = request.body.payload_fields.dataType;
  const device_id = request.body.dev_id;

  if (dataType === 'location') {
    const locationData = request.body.payload_fields.location;
    firebaseAdmin
      .firestore()
      .doc(`markers/${device_id}`)
      .set(
        {
          geometry: {
            coordinates: locationData,
            type: 'Point'
          },
          properties: {
            icon: 'bus',
            name: device_id
          },
          type: 'Feature'
        },
        { merge: true }
      )
      .then(() => response.send('Good job!'))
      .catch(err => response.send(err));
  } else if (dataType === 'beacon') {
    const beaconId = request.body.payload_fields.beaconId;
    firebaseAdmin
      .firestore()
      .collection('devices')
      .where('beaconCode', '==', beaconId)
      .get()
      .then(snapshot =>
        snapshot.forEach(doc =>
          doc.ref.set(
            {
              lastConnectedDate: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
              lastConnectedMarker: device_id
            },
            { merge: true }
          )
        )
      )
      .catch(err => response.send(err));
  }
});
