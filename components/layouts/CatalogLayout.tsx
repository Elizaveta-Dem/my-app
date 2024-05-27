'use client'
import styles from "../templates/ProductsPage/catalog.module.scss"

const CatalogLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main>
            <section className={styles.catalog}>
                <div className='container'>{children}</div>
            </section>
        </main>
    );
};
  
export default CatalogLayout;
