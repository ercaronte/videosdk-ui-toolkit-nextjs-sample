
import VideochatWrapper from "../components/VideochatWrapper";
import VideochatOriginalWrapper from "../components/original/VideochatWrapper";

export default async function Page({ searchParams }) {

  const params = await searchParams;

  return <>
    {params.dynamic === 'true' ?
      <VideochatWrapper params={params}/>
      :
      <VideochatOriginalWrapper params={params}/>
    }
  </>
}
