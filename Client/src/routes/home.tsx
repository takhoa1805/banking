import CustomCarousel from '@/components/CustomCarousel'
import { Link } from 'react-router-dom'

export default function Home() {
  const carouselItems = [
    {
      imageSrc: 'about_1.png',
      title: 'Đồng hành cùng bạn, vững bước tương lai',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      imageSrc: 'about_2.png',
      title: 'Tài chính thông minh, cuộc sống tiện ích',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      imageSrc: 'about_3.png',
      title: 'Khách hàng trọng tâm, dịch vụ tận tâm',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      imageSrc: 'about_4.png',
      title: 'Vững bền tài chính, Khởi sinh thịnh vượng',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      imageSrc: 'about_5.png',
      title: 'Đối tác tin cậy, Tương lai vững bền',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }
  ]
  return (
    <div>
      <section
        className='bg-cover bg-center h-80'
        style={{
          backgroundImage: "url('home.png')"
        }}
      >
        <div className='bg-black bg-opacity-50 h-full flex flex-col justify-center items-center text-center text-textMainColor px-4'>
          <h2 className='text-4xl md:text-6xl font-bold mb-6 text-white'>Chào mừng đến với DBankMS</h2>
        </div>
      </section>
      <CustomCarousel items={carouselItems} />
    </div>
  )
}
