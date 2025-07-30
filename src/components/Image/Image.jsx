import { Image, ImageKitProvider } from '@imagekit/react';


const Images = ({src,alt,className,w,h,onClick}) => {
    return (
        <Image
            urlEndpoint={import.meta.env.VITE_URL_IK_ENDPOINT}
            src={src}
            transformation={[
                { width: w },
                { height: h },
            ]}
            alt= {alt}
            loading ="lazy"
            lqip={{ active: true, quality:10}}
            className={className}
            onClick ={onClick}
             />
    )
}

export default Images