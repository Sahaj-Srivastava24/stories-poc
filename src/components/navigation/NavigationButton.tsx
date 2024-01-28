export default function NavigationButton({ text, cb }: { text: string, cb: () => void }) {
  return (
    <div className="text-white z-[100] cursor-pointer">
      <span className="p-5" onClick={() => {
        cb()
      }}>
        {text}
      </span>
    </div>
  )
}