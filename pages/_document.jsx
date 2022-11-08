import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className='w-full m-0 lg:h-full'>
      <Head />
      <body className='w-full m-0 overflow-x-hidden lg:h-full lg:overflow-y-hidden'>
        <Main />
        <NextScript/>
      </body>
    </Html>
  )
}
