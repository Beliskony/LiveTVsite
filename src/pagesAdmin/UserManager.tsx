import { UserInfoTable } from './UserInfosTable'

const UsersManager = () => {

  return (
    <section className='flex flex-col w-full gap-y-3 h-screen '>
        <h3 className='text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900'>Gestion des utilisateurs</h3>
        <UserInfoTable />
    </section>
  )
}

export default UsersManager