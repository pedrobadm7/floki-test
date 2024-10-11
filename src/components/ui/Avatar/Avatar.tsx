const Avatar = ({
  src,
  alt,
  fallback,
}: {
  src: string;
  alt: string;
  fallback: string;
}) => (
  <div className="flex-shrink-0 h-10 w-10">
    <img
      className="h-10 w-10 rounded-full"
      src={src}
      alt={alt}
      onError={e => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(fallback)}&color=7F9CF5&background=EBF4FF`;
      }}
    />
  </div>
);

export default Avatar;
