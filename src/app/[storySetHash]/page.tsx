type PageProps = {
  storySetHash: string
}

export default function Page({ params }: { params: PageProps }) {
  console.log(params)

  return (
    <>
      Story Set Hash - {params.storySetHash}
    </>
  )
}