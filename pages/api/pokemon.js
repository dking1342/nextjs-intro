
export default function handler (req, res) {
  res.unstable_revalidate("/pokemon/1")
  res.status(200).json({ name: "Jack" })
}