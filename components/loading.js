import styles from "@/app/styles/loading.css"; 

export default function Loading() {
    return(
        <div className="loading-screen">
        <div className="loader"></div>
        <p className="loading-text">Loading...</p>
      </div>
    );
}