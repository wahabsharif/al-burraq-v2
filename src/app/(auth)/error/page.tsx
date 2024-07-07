import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

export default function ErrorPage() {
  const router = useRouter();

  return (
    <div>
      <h1>Authentication Error</h1>
      <p>An error occurred during authentication. Please try again.</p>
      <button onClick={() => router.push('/login')}>Back to Login</button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // You can access the error message from the context object
  const errorMessage = context.query.message;

  return {
    props: { errorMessage },
  };
};