import { Button } from "../components/button";
import { Divider } from "../components/divider";
import { Heading } from "../components/heading";
import { useState } from "react";
export default function UploadList() {
    const [file, setFile] = useState(null)
  return (
    <div>
        <Heading>
            Upload List
        </Heading>
        {/* input to name the list  */}
        <label htmlFor="list-name" className="block text-sm font-medium leading-6 text-gray-900 mt-6 mb-4">
            Name your list
        </label>
        <input type="text" placeholder={file ? file.name : "List Name"} className="w-full border border-lime-800/30 rounded-lg px-4 py-2 mb-4 outline-lime-800" />
        <div className="col-span-full mb-10">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Upload CSV file with mandatory "email" column
              </label>
              <div className="mt-4 flex justify-center rounded-lg border border-dashed border-lime-900/30 px-6 py-10">
                <div className="text-center">
                  
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-lime-400 focus-within:outline-none focus-within:ring-2  focus-within:ring-lime-600 focus-within:ring-offset-4 hover:text-lime-500"
                    >
                        {
                            file ?  <span className="text-2xl">{file.name}</span>: <span>Upload a File</span>
                        }
                      
                      {/* allow only csv file type */}
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".csv" onChange={(e) => setFile(e.target.files[0])} />
                    </label>
                    {!file && (<p className="pl-1">or drag and drop</p>)}
                  </div>

                  <p className="text-xs leading-5 text-gray-600">
                    {file ? "mandatory email column" : "CSV up to 10MB"}
                  </p>
                </div>
              </div>
            </div>
        {file && <Button color="lime">Upload List</Button>}
    </div>
  );
}