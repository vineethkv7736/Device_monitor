import styles from "@/app/styles/loading.css"; 

export default function FetchData() {
    return(
        <div className="loading-screen">
        <div className="loader"></div>
        <p className="loading-text">Fetching your Data...</p>
      </div>
    );
}