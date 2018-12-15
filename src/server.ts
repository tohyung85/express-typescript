import app from './app';

app.listen(process.env.PORT, () => {
  console.log(`Express App is running on ${process.env.PORT}`);
});
