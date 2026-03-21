import { compile, run } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'

type Props = {
  source: string
  components?: Record<string, React.ComponentType<React.HTMLAttributes<HTMLElement>>>
}

export async function MDXContent({ source, components = {} }: Props) {
  const code = await compile(source, { outputFormat: 'function-body' })
  const { default: Content } = await run(code, {
    ...(runtime as Parameters<typeof run>[1]),
    baseUrl: import.meta.url,
  })
  return <Content components={components} />
}
