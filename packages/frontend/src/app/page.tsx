import { slug } from '@openstay/utils'

export default function Home() {
  return (
    <div className="flex">
      <h1 className="text-4xl text-brand-dark">{slug('Hello World')}</h1>
    </div>
  )
}
