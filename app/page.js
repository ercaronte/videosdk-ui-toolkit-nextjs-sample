import Form from 'next/form'

export default function Home() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <main className="max-w-lg flex flex-col gap-16 items-center">

        <h2 className="text-base/7 font-semibold">Zoom Video SDK UI toolkit</h2>

        <Form action="/zoom" className="max-w-lg flex flex-col gap-4">

          <div>
            <label htmlFor="userName" className="text-sm/6">
              Session Name
            </label>
            <input
              id="sessionName"
              name="sessionName"
              type="text"
              // defaultValue="John's Session"
              placeholder="Enter a name for this session"
              className="block w-full rounded-md bg-white dark:bg-black px-3 py-2 text-base sm:text-sm/6 outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
            />
          </div>

          <div>
            <label htmlFor="userName" className="text-sm/6">
              User Name
            </label>
            <input
              id="userName"
              name="userName"
              type="text"
              // defaultValue="John"
              placeholder="Enter your name"
              className="block w-full rounded-md bg-white dark:bg-black px-3 py-2 text-base sm:text-sm/6 outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
            />
          </div>

          <fieldset className="flex flex-col text-sm/6">
            Role
            <div className="flex gap-4 items-center">
              <label>
                <input type="radio" name="role" value="1" defaultChecked="true" className="mr-2"/>
                Host
              </label>
              <label>
                <input type="radio" name="role" value="0" className="mr-2"/>
                Guest
              </label>
            </div>
          </fieldset>

          <fieldset className="flex flex-col text-sm/6">
            CSS
            <div className="flex gap-4 items-center">
              <label>
                <input type="radio" name="prefixed" value="false" defaultChecked="true" className="mr-2"/>
                Original
              </label>
              <label>
                <input type="radio" name="prefixed" value="true" className="mr-2"/>
                Prefixed
              </label>
            </div>
          </fieldset>

          <button
            type="submit"
            className="mt-4 rounded-full bg-gray-900 dark:bg-gray-200 px-4 py-2.5 text-sm font-semibold text-white dark:text-black shadow-xs hover:bg-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Join session
          </button>

        </Form>

        <div className="w-full">
          <p className="text-base/8 font-semibold text-center">Test CSS overwriting</p>
          <p className="text-sm/6 text-justify">
            Make the window window large enough to show the text in red.
            The zoom CSS will make the text in red disappear after a zoom call.<br/>
            In addition, some other formatting maybe be disrupted, like background colors, font size or alignments.</p>

          <p className="pt-2 text-sm/6 text-red-500 hidden sm:block">This is the test line. Am I still visible?</p>

        </div>
      </main>
    </div>
  )
    ;
}
