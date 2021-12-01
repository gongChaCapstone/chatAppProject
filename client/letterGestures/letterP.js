import * as fp from 'fingerpose';

const letterP = new fp.GestureDescription('P');

letterP.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
letterP.addDirection(fp.Finger.Thumb, fp.FingerDirection.HorizontalLeft, 1.0);
letterP.addDirection(fp.Finger.Thumb, fp.FingerDirection.HorizontalRight, 1.0);
letterP.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 0.9);
letterP.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 0.9);

letterP.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
letterP.addDirection(fp.Finger.Index, fp.FingerDirection.HorizontalLeft, 1.0);
letterP.addDirection(fp.Finger.Index, fp.FingerDirection.HorizontalRight, 1.0);

letterP.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);
letterP.addCurl(fp.Finger.Middle, fp.FingerCurl.HalfCurl, 0.9);
letterP.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalDownLeft, 1.0);
letterP.addDirection(
  fp.Finger.Index,
  fp.FingerDirection.DiagonalDownRight,
  1.0
);

for (let finger of [fp.Finger.Ring, fp.Finger.Pinky]) {
  letterP.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  letterP.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);
  letterP.addDirection(finger, fp.FingerDirection.HorizontalRight, 1.0);
  letterP.addDirection(finger, fp.FingerDirection.HorizontalLeft, 1.0);
}

export default letterP;
