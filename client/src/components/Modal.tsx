"use client";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import MovieForm from "./Forms/MovieForm";
import ReviewForm from "./Forms/ReviewForm";

function Modal() {
  const searchParams = useSearchParams();

  const createMovie = searchParams.get("createMovie");
  const createReview = searchParams.get("createReview");
  const editMovie = searchParams.get("editMovie");
  const editReview = searchParams.get("editReview");

  const pathname = usePathname();
  const getModalTitle = () => {
    if (createMovie) {
      return "Add a new movie";
    } else if (createReview) {
      return "Add a new review";
    } else if (editMovie) {
      return "Edit movie";
    } else if (editReview) {
      return "Edit review";
    }
  };
  return (
    <>
      {(createMovie || createReview || editMovie || editReview) && (
        <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
          <div className="bg-white m-auto p-8 w-1/3">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-between w-full">
                <div className="">{getModalTitle()}</div>
                <Link
                  href={pathname}
                  className="bg-primary text-white w-5 h-5 rounded-full flex items-center justify-center p-2"
                >
                  x
                </Link>
              </div>
              <br />
              {(createMovie || editMovie) && <MovieForm />}
              {(createReview || editReview) && <ReviewForm />}
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}

export default Modal;
