import { NextPageContext } from 'next';
import Link from 'next/link';
import buildClient from '../api/build-client';

const Index = ({ currentUser }: any) => {
  const links = [
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && { label: 'Sign Out', href: '/auth/signout' },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }: any) => {
      return (
        <Link key={href} href={href}>
          <a className="block mx-4 mt-2 md:mt-0 text-sm text-gray-700 capitalize hover:text-blue-600">
            {label}
          </a>
        </Link>
      );
    });

  return (
    <div>
      <nav className="bg-white shadow">
        <div className="container mx-auto px-6 py-3 ">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-between items-center">
              <div className="text-xl font-semibold text-gray-700">
                <Link href="/">
                  <a className="text-gray-800 text-xl font-bold hover:text-gray-700 md:text-2xl">
                    WiseUp
                  </a>
                </Link>
              </div>

              {/* <!-- Mobile menu button --> */}
              <div className="flex md:hidden">
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                  aria-label="toggle menu"
                >
                  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                    <path
                      fillRule="evenodd"
                      d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* <!-- Mobile Menu open: "block", Menu closed: "hidden" --> */}
            <div className="hidden -mx-4 md:flex md:items-center">{links}</div>
          </div>
        </div>
      </nav>
      <h1>You are {currentUser ? null : 'NOT '}signed in</h1>
    </div>
  );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  const client = buildClient(ctx);
  const { data } = await client.get('/api/users/currentuser');
  const { currentUser } = data;
  return {
    props: {
      currentUser,
    },
  };
};

export default Index;
