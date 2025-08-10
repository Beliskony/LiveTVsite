interface ProgramCardProps {
  image: string
}

export const ProgramCard = ({ image }: ProgramCardProps) => {
  return (
    <div className="relative flex w-full justify-center h-60 md:h-[450px] lg:h-[550px] rounded-xl overflow-hidden group">
      <div
        className="absolute w-full h-full inset-0 bg-cover transition-transform duration-300 group-hover:scale-105"
        style={{ backgroundImage: `url(${image})` }}
        role="img"
        aria-label="Image du programme"
      />
    </div>
  )
}
