import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
export default function CustomCarousel({ items }) {
  return (
    <>
      <Carousel
        opts={{
          align: 'start',
          loop: true
        }}
        plugins={[
          Autoplay({
            delay: 5000
          })
        ]}
        className='h-96'
      >
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem>
              <div
                key={index}
                className='w-full h-96 justify-center items-center mb-5 flex flex-col md:flex-row'
                data-carousel-item
              >
                <img className='object-cover h-96 w-full aspect-auto' src={item.imageSrc} alt='wrapper item' />
                <div className='h-96 w-full bg-teal-950 p-4 md:p-10 space-y-5 flex flex-col text-left'>
                  <div className='text-white text-2xl font-bold leading-9'>{item.title}</div>
                  <div className='text-white text-sm leading-5'>{item.description}</div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  )
}
