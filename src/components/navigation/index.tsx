export default function NavigationButton({ text, cls = "", cb }: { text: string, cls?: string, cb: () => void }) {
  return (
    <div className={`text-white z-[100] cursor-pointer ${cls} scale-[2]`}>
      <span className="p-5" onClick={() => {
        cb()
      }}>
        {text}
      </span >
    </div >
  )
}