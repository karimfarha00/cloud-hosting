import { Geist_Mono } from 'next/font/google';

const geistMono = Geist_Mono({ subsets: ['latin'] });

const AdminPage = () => {
  throw new Error("This Error is from admin page");
  return (
    <div className={geistMono.className}>
        <h1>Admin Page</h1>
        <p>Welcome to the Admin Page</p>
        <p>Here you can manage the application settings and user accounts.</p>
    </div>
  )
}

export default AdminPage
