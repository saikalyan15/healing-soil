export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="font-serif text-4xl text-green-primary">{params.slug}</h1>
    </div>
  )
}
