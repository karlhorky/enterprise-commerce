import { PlatformCart } from "@enterprise-commerce/core/platform/types"
import { Button } from "components/Button/Button"
import { CloseIcon } from "components/Icons/CloseIcon"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "components/Sheet/Sheet"
import { useRouter } from "next/navigation"
import { CartItem } from "./CartItem"

interface CartSheetProps {
  cart: PlatformCart
  onCartClose: () => void
  onCartOpen: () => void
  isOpen: boolean
}

export function CartSheet({ cart, isOpen, onCartOpen, onCartClose }: CartSheetProps) {
  const router = useRouter()

  const hasAnyItems = cart?.items?.length > 0
  const subtotalFormatted = cart?.cost?.subtotalAmount?.amount + " " + cart?.cost?.subtotalAmount?.currencyCode
  const totalFomatted = cart?.cost?.totalAmount?.amount + " " + cart?.cost?.totalAmount?.currencyCode

  return (
    <Sheet open={isOpen} onOpenChange={() => onCartClose()}>
      <SheetContent className="size-full min-h-[100vh] bg-white p-0 ">
        <SheetHeader className="mb-4 flex w-full flex-row items-center justify-between border-b border-black">
          <SheetTitle className="p-4 text-[20px] font-normal">Review your cart</SheetTitle>
          <SheetClose className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute right-4 top-4 rounded-sm bg-white opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
            <CloseIcon className="size-4" />
            <span className="sr-only">Close</span>
          </SheetClose>
        </SheetHeader>

        {!hasAnyItems && <CartEmptyState />}

        <div className="mb-4 flex size-full h-[calc(100%-63px-260px)] flex-col gap-4 overflow-x-hidden p-4">
          {cart?.items.map((singleItem) => <CartItem {...singleItem} key={singleItem.id + "_" + singleItem.merchandise.id} onProductClick={() => onCartClose()} />)}
        </div>

        {hasAnyItems && (
          <SheetFooter className="border-t border-black p-4">
            <div className="w-full bg-white py-4 text-sm text-neutral-500">
              <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 ">
                <p>Subtotal</p>
                <p className="text-right text-base text-black ">{subtotalFormatted}</p>
              </div>
              <div className="mb-3 flex items-center justify-between border-b border-neutral-200 py-1 ">
                <p>Shipping</p>
                <p className="text-right">Calculated at checkout</p>
              </div>
              <div className="mb-3 flex items-center justify-between border-b border-neutral-200 py-1 ">
                <p>Total</p>
                <p className="text-right text-base text-black ">{totalFomatted}</p>
              </div>
              <Button
                variant="secondary"
                isAnimated={false}
                className="w-full justify-center text-center hover:text-white"
                size="lg"
                onClick={() => router.push(cart?.checkoutUrl)}
              >
                Proceed to Checkout
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}

function CartEmptyState() {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-2 text-[21px] font-normal text-black">
      <svg className="mb-6 size-24 fill-none" width="21" height="26" viewBox="0 0 21 26" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5.75 7.48649C5.75 7.48649 5.22222 1 10.5 1C15.7778 1 15.25 7.48649 15.25 7.48649M1 23.7027L2.00081 6.48252C2.03155 5.95366 2.46938 5.54054 2.99912 5.54054H18.0051C18.5331 5.54054 18.97 5.94786 19.0028 6.47487C19.3684 12.3442 20 22.7195 20 23.7027C20 24.7405 19.2963 25 18.9444 25C13.6667 25 2.9 25 2.05556 25C1.21111 25 1 24.1351 1 23.7027Z"
          stroke="black"
          strokeLinecap="round"
        />
      </svg>
      <p>Your cart is empty</p>
    </div>
  )
}
