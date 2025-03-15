import InstagramIcon from '../assets/icons/instagram-32px-circle.png'
import WhatsappIcon from '../assets/icons/whatsapp-32px-circle.png'
import ChaleIcon from '../assets/icons/Chale.png'

export const Header = () => {
    return(
        <>
            <div className="flex justify-between items-center p-4 border-b">

                <div className='flex justify-center items-center gap-2'>
                    <a href="/" className="hover:shadow-2xl hover:rounded-xl transition-shadow duration-300">
                        <img src={ChaleIcon} alt="Chale Icon" className="h-15 rounded-lg" />
                    </a>
                    <p className='text-xl font-mono hover:font-bold'>Grupo Industrial</p>
                </div>

                <div className="flex space-x-4">
                    <a
                        href="https://www.instagram.com/chaleindustrial/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-80 transition-opacity"
                    >
                        <img src={InstagramIcon} alt="Ícone do Instagram" className="h-8 w-auto" />
                    </a>
                    <a
                        href="https://wa.me/seunumerodewhatsapp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-80 transition-opacity"
                    >
                        <img src={WhatsappIcon} alt="Ícone do WhatsApp" className="h-8 w-auto" />
                    </a>
                </div>
            </div>
        </>
    )
}