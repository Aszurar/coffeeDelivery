import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

import { AddressSelected } from '@/components/AddressSelected'
import { RegisterAddressForm } from '@/components/Form/RegisterAddressForm'
import { DeleteSelectedAddressDialog } from '@/components/ModalDialogAndDrawer/DeleteSelectedAddressDialog'
import { SelectAddressModal } from '@/components/ModalDialogAndDrawer/SelectAddressModal'
import { useAddressSelectors } from '@/store'

const tabs = {
  FIRST: 0,
  SECOND: 1,
} as const

export function AddressesTabs() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const deleteSelectedAddressDialogCancelRef = useRef<HTMLButtonElement>(null)

  const {
    isOpen: isDeleteSelectedAddressDialog,
    onOpen: onDeleteSelectedAddressDialogOpen,
    onClose: onDeleteSelectedAddressDialogClose,
  } = useDisclosure()

  const {
    totalAddresses,
    incompleteAddress,
    maxAddresses,
    selectedAddress,
    removeAddress,
  } = useAddressSelectors()

  function handleRemoveAddress() {
    if (selectedAddress) {
      removeAddress(selectedAddress.id)
    }
  }

  const listOfAddressIsEmpty = totalAddresses === 0
  const tabActivated = listOfAddressIsEmpty ? tabs.SECOND : tabs.FIRST
  const isNotPossibleAddNewAddress = totalAddresses === maxAddresses

  const [currentTab, setCurrentTab] = useState<number>(tabActivated)
  const [isEditable, setIsEditable] = useState(false)

  const secondTabTitle = isEditable
    ? 'Editar endereço'
    : 'Adicione um novo endereço'

  function handleSelectFirstTab() {
    setCurrentTab(tabs.FIRST)
  }
  function handleSelectSecondTab() {
    setCurrentTab(tabs.SECOND)
  }

  function switchTabs() {
    if (listOfAddressIsEmpty) {
      handleSelectSecondTab()
    } else {
      handleSelectFirstTab()
    }
  }

  function handleEditAddress() {
    handleSelectSecondTab()
    setIsEditable(true)
  }

  function handleCancelEditAddress() {
    handleSelectFirstTab()
    setIsEditable(false)
  }

  useEffect(() => {
    // Switch to add address when the list of address is empty
    switchTabs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalAddresses])

  useEffect(() => {
    // Switch to register address when the cep has been added
    if (incompleteAddress) {
      handleSelectSecondTab()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incompleteAddress])

  return (
    <Tabs variant="unstyled" defaultIndex={tabActivated} index={currentTab}>
      <TabList>
        <Tab
          isDisabled={listOfAddressIsEmpty}
          rounded="base"
          fontWeight="600"
          fontFamily="heading"
          _selected={{ color: 'white', bg: 'purple.500' }}
          onClick={handleSelectFirstTab}
        >
          Endereço selecionado
        </Tab>
        <Tab
          rounded="base"
          fontWeight="600"
          fontFamily="heading"
          _selected={{ color: 'white', bg: 'purple.500' }}
          onClick={handleSelectSecondTab}
          isDisabled={isNotPossibleAddNewAddress}
        >
          {secondTabTitle}
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel px="0">
          {isNotPossibleAddNewAddress && (
            <Alert status="warning" py="3">
              <AlertIcon />
              <Box>
                <AlertTitle color="gray.800">
                  Limite de endereços atingido!
                </AlertTitle>
                <AlertDescription fontSize="0.8125rem" fontWeight="500">
                  Para adicionar um novo endereço, remova um dos endereços já
                  cadastrados.
                </AlertDescription>
              </Box>
            </Alert>
          )}
          <AddressSelected
            isEditable={isEditable}
            onEditAddress={handleEditAddress}
            onSelectAddressModalOpen={onOpen}
            onCancelEditAddress={handleCancelEditAddress}
            onDeleteSelectedAddressDialogOpen={
              onDeleteSelectedAddressDialogOpen
            }
          />
        </TabPanel>
        <TabPanel>
          <RegisterAddressForm
            isEditable={isEditable}
            onSelectFirstTab={handleSelectFirstTab}
            onCancelEditAddress={handleCancelEditAddress}
          />
        </TabPanel>
      </TabPanels>
      <SelectAddressModal isOpen={isOpen} onClose={onClose} />
      <DeleteSelectedAddressDialog
        isOpen={isDeleteSelectedAddressDialog}
        onClose={onDeleteSelectedAddressDialogClose}
        onRemoveSelectedAddress={handleRemoveAddress}
        cancelRef={deleteSelectedAddressDialogCancelRef}
      />
    </Tabs>
  )
}
