
import VideochatWrapper from "../components/VideochatWrapper";

export default async function Page({ searchParams }) {

  const params = await searchParams;

  return <>
      <VideochatWrapper params={params}/>
  </>
}
