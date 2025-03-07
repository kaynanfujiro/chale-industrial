import InstagramIcon from '../assets/icons/instagram-32px-circle.png'
import WhatsappIcon from '../assets/icons/whatsapp-32px-circle.png'
import ChaleIcon from '../assets/icons/Chale.png'

export const Header = () => {
    return(
        <>
            <div className="flex flex-justify-between items-center space-x-4 p-4 border-b">
                <div className="text-xl font-bold">
                    <a className="hover:text-gray-600" href="#">
                        <img src={ChaleIcon} alt="Chale Icon" />
                    </a>
                </div>

                <div className="flex space-x-6">
                    <p>Chalés</p>
                </div>

                <div className="flex space-x-4">
                    <a 
                    href="https://www.instagram.com/chaleindustrial/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-600">
                    <img className='' src={InstagramIcon} alt="Icone whatsapp"/>
                    </a>

                    <a 
                    href="https://www.instagram.com/chaleindustrial/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-600">
                    <img src={WhatsappIcon} alt="Icone whatsapp"/>
                    </a>
                </div>
            </div>
        </>
    )
}