
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const InstructionsModal = ({ exercise, closeModal }: any) => {
    if (!exercise) return null;
  
    return (
      <>
        <div className="bg-gray-800 z-40 fixed top-0 left-0 w-full h-full opacity-50"></div>

        <div className="absolute z-50" style={{ left: '-20%', top: '-2%' }}>

          <div className="bg-slate-700 w-full p-7 rounded-md" style={{ maxHeight: '100%' }} >

            <span className="font-semibold flex items-center justify-between text-2xl text-white">
                How to Properly Execute this exercise:
                  <FontAwesomeIcon onClick={closeModal} className="text-4xl hover:opacity-75 text-white cursor-pointer" icon={faTimes} />
            </span>

            <br />

                <h1 className="text-white text-2xl text-justify font-bold tracking-wider">
                    {exercise.instructions}
                </h1>

          </div>

        </div>

      </>

    );

}

export default InstructionsModal
  
