import Document, { Head, Main, NextScript, } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <style>{`body { margin: 0 } /* custom! */`}</style>
          <link rel='icon' type='image/x-icon' href='/static/favicon.ico' />
          <link href='https://fonts.googleapis.com/css?family=Nanum+Gothic:400,700,800&amp;subset=korean' rel='stylesheet'></link>
        </Head>
        <body className='custom_class'>
          <Main />
          <NextScript />
        </body>
        <script> </script>
      </html>
    )
  }
}
