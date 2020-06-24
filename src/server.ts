import app from './service';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const listener: any = app.listen(process.env.PORT || undefined, () => {
  let host = listener.address().address;
  if (host === '::') {
    host = 'localhost';
  }
  const port = listener.address().port;

  console.log(`Listening at http://${host}${port === 80 ? '' : ':' + port}`);
});
