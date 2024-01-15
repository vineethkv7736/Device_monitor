import styles from "@/app/styles/loading.css"; 

export default function SiginIn() {
    return(
        <div className="loading-screen">
        <div className="loader"></div>
        <p className="loading-text">Logining you In...</p>
      </div>
    );
}