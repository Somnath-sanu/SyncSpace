import { currentUser } from "@clerk/nextjs/server";
import { TypewriterEffectSmoothDemo } from "./TypewriterEffectSmoothDemo";


export async function Hero2(){
  const user = await currentUser();
  return(
    <section className="w-full overflow-hidden dark:bg-black max-w-7xl mx-auto">
      <TypewriterEffectSmoothDemo user={user?.emailAddresses[0].emailAddress}/>
    </section>
  )
}