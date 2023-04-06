export default function ProgressBar({ name, color, data, sum, unit='g' }) {
  let over = false;
  let left = sum - data;
  if (left < 0) {
    left *= -1;
    over = true;
  }
  let progress = 100 / (sum / data)
  if (progress > 100)
    progress = 100

  return (
    <div className="w-full h-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-gray-500">{name}</p>
        <p className="text-sm font-medium text-gray-700"><b>{data.toFixed(0)}</b>{` / ${sum}${unit}`}</p>
      </div>
      <div className="w-full h-4 rounded-full bg-zinc-300 mb-2">
        <div className={`h-full rounded-full bg-${color}-500 flex justify-center`}
        style={{ width: `${progress}%` }}
        >
        </div>
        <div className="flex items-center justify-center mb-2">
          <p className="text-sm font-medium text-gray-500">{left.toFixed(0)}{unit} {over ? 'over' : 'left'}</p>
        </div>
      </div>
    </div>
  )
}
