type Props = {
  className: string
  description: string
  color: string
  img: string
  stats: string
}

const CardsWidget20 = ({className, description, color, img, stats}: Props) => (
  <div
    className={`card card-flush bgi-no-repeat bgi-size-contain bgi-position-x-end ${className}`}
    style={{
      backgroundColor: color,
      backgroundImage: `url('${img}')`,
    }}
  >
    <div className='card-header pt-5 pb-8'>
      <div className='card-title d-flex flex-column mb-7'>
        <span className='fs-3hx fw-bold text-white me-2 lh-1 ls-n2'>{stats}</span>

        <span className='text-white opacity-75 pt-1 fw-semibold fs-2 '>{description}</span>
      </div>
    </div>
    <div className='card-body d-flex align-items-end pt-0'>
      <div className='d-flex align-items-center flex-column mt-3 w-100'>
   

        
      </div>
    </div>
  </div>
)
export {CardsWidget20}
