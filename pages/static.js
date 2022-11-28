export async function getStaticProps() {
  return {
    props: {
      message: "This is a static page — and now this is a prop!",
    },
  };
}

const Page = ({ message }) => {
  console.log(message);
  return (
    <main>
      <h1 id="message">{message}</h1>
    </main>
  );
};

export default Page;
