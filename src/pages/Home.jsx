import Italian from "../components/Italian";
import Japanese from "../components/Japanese";
import {motion} from "framer-motion";



const Home = () => {
    return (
        <div>
             <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        
      >
           <Italian />
            <Japanese />   
      </motion.div>

                   

        </div>
    );
};

export default Home;