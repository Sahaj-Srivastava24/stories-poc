export default function Page({ params }) {
  console.log(params)

  return (
    <>
      Story Set Hash - {params.storySetHash}
    </>
  )
}