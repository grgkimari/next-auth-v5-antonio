import { auth, signOut } from "@/auth";

export default async function SettingsPage() {
  const session = await auth();
  return (
    <>
      <h1 className=" underline">Settings Page</h1>
      <p>{JSON.stringify(session)}</p>
      <form
        action={async () => {
          "use server";
          await signOut({redirectTo : "/"});
        }}
      >
        <button type="submit" className="border-2 border-black m-2 p-2 rounded-xl">Log out</button>
      </form>
    </>
  );
}
