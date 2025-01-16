import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

function Home() {
    return (
        <>
            <Navbar />
            <div className="main-container">
                <div className="utility-container">
                    <span id="tag-line">
                        Share. Download. Inspire
                    </span>
                    <p>
                        A hub for stunning wallpapers—upload, explore, and download your favorites. Discover and share creativity with the world!
                    </p>
                    <div className="search-container">
                        <input type="text" className="search" />
                        <div id="search">Search</div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default Home
// window.onload = () => {
//     const width = 800;
//     let fileInput = document.getElementById('uplaoded-image');
//     fileInput.addEventListener('change', (e) => {
//         const file = e.target.files[0];

//         const reader = new FileReader();
//         reader.readAsDataURL(file)
//         reader.onload = (event) => {
//             let image_url = event.target.result;
//             // console.log(image_url)
//             let image = document.createElement('img');
//             image.src = image_url;

//             image.onload = (e) => {
//                 let canvas = document.createElement('canvas');
//                 let ratio = width / e.target.width;
//                 canvas.width = width
//                 canvas.height = e.target.height * ratio
//                 let ctx = canvas.getContext('2d');
//                 ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height)
//                 let new_image_url = canvas.toDataURL('image/jpeg', 90)
//                 let new_image = document.createElement('img');
//                 new_image.src = new_image_url;
//                 document.getElementById('wrapper').appendChild(new_image)

//             }
//         }

//     });
// }