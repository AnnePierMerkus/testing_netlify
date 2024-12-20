interface ModalProps {
    onClose: () => void;
    modalContent: string;
    onSubmit: (e: React.FormEvent) => void;
    file: File | null;
    setFile: React.Dispatch<React.SetStateAction<File | null>>;
    uploading: boolean;
    setUploading: React.Dispatch<React.SetStateAction<boolean>>;
  }
  
  const Modal = ({
    onClose,
    modalContent,
    onSubmit,
    file,
    setFile,
    uploading,
    setUploading
  }: ModalProps) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
          <h3 className="text-xl font-bold mb-4 text-black">Medical History</h3>
          <div className="text-black">
            {modalContent === 'form' ? (
              <>
                <form onSubmit={onSubmit}>
                  <div className="mb-4">
                    <label htmlFor="file" className="block text-lg">Upload your medical history</label>
                    <input
                      type="file"
                      id="file"
                      onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                      className="w-full p-2 border rounded-md text-black"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                  </div>
  
                  {uploading ? (
                    <div className="text-center mt-4 text-black">
                      <span>Uploading...</span>
                    </div>
                  ) : (
                    <div className="flex justify-end mt-4">
                      <button
                        type="submit"
                        className="bg-teal-600 text-white py-2 px-6 rounded-md border-2 border-teal-600 hover:bg-teal-700"
                      >
                        Submit Medical History
                      </button>
                    </div>
                  )}
                </form>
              </>
            ) : (
              <p className="text-center text-black">Your medical history has been successfully submitted.</p>
            )}
          </div>
  
          {/* Buttons section */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Modal;
  