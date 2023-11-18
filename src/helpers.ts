
export function getFormmatedTimestamp(duration: number | undefined) {
  if (!duration) {
    return "00:000";
  }
  const minutes = Math.floor(duration / 60);
  const seconds = duration - minutes * 60;
  
  return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds.toPrecision(3)}`;
}
