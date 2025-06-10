
import VideochatPrefixedWrapper from "../components/prefixed/VideochatPrefixedWrapper";
import VideochatWrapper from "../components/original/VideochatWrapper";

export default async function Page({ searchParams }) {

  const params = await searchParams;

  return <>
    {params.prefixed === 'true' ?
      <VideochatPrefixedWrapper params={params}/>
      :
      <VideochatWrapper params={params}/>
    }
  </>
}
