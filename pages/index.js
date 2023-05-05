import Banner from "@/components/Banner";
import ProductCats from "@/components/ProductCats";
import Wrapper from "@/components/Wrapper";
import { fetchDataFromApi } from "@/utils/Api";

export default function Home({ products }) {
  
  return (
    <main className="">
      <Banner />
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Cushioning for Your Miles
          </div>
          <div className="text-md md:text-xl">
            A lightweight Nike XoomX midsole is combined with increased stack
            height to help provide cushioning suring extended stretches of
            running.
          </div>
          {/* heading and paragraph end */}

          {/* Product grid start */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
            {products?.data?.map((product) =>(
              <ProductCats key={product.id} data={product}/>
            ))}        
          </div>
          {/* Product grid end */}
        </div>
      </Wrapper>
    </main>
  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const products = await fetchDataFromApi("/api/products?populate=*");

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      products,
    },
  }
}
