import Contact_form from "@/components/Contact_form";

export default async function Home() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Server action Demo</h1>
          <p className="text-xl text-gray-500 max-2xl mx-auto">Contact form with MongoDB and revalidation</p>
        </div>
        <Contact_form />
      </div>
    </main>
  );
}
