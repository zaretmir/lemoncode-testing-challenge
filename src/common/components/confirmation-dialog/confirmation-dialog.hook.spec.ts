import { act, renderHook } from '@testing-library/react-hooks';
import { useConfirmationDialog } from './confirmation-dialog.hook';
import { Lookup } from '../../models';

describe('Confirmation dialog hook specs', function() {
  it('should return an object with property isOpen set to false, when called for the first time', function() {
    // Given
    const { result } = renderHook(() => useConfirmationDialog());

    // Then
    expect(result.current.isOpen).toEqual(false);
  });

  it('should return an object with property itemToDelete set to an empty Lookup, when called for the first time', function() {
    // Given
    const { result } = renderHook(() => useConfirmationDialog());
    const emptyLookup: Lookup = {
      id: '',
      name: '',
    };

    // Then
    expect(result.current.itemToDelete).toEqual(emptyLookup);
  });

  it('should set the value of isOpen to true, and the itemToDelete to the value passed as argument, when calling onOpenDialog', function() {
    // Given
    const { result } = renderHook(() => useConfirmationDialog());
    const aLookup: Lookup = {
      id: 'a lookup id',
      name: 'a lookup name',
    };

    // When
    act(() => {
      result.current.onOpenDialog(aLookup);
    });

    // Then
    expect(result.current.isOpen).toEqual(true);
    expect(result.current.itemToDelete).toEqual(aLookup);
  });

  it('should set the value of isOpen to false when calling onClose', function() {
    // Given
    const { result } = renderHook(() => useConfirmationDialog());
    const irrelevantLookup: Lookup = undefined

    // When
    act(() => {
      result.current.onOpenDialog(irrelevantLookup); // Indirectly set isOpen to to true to avoid a false positive
      result.current.onClose();
    });

    // Then
    expect(result.current.isOpen).toEqual(false);
  });

  it('should reset itemToDelete to an empty Lookup when calling onAccept', function() {
    // Given
    const { result } = renderHook(() => useConfirmationDialog());
    const aLookup: Lookup = {
      id: 'a lookup id',
      name: 'a lookup name',
    };
    const emptyLookup: Lookup = {
      id: '',
      name: '',
    };

    // When
    act(() => {
      result.current.onOpenDialog(aLookup); // Indirectly set itemToDelete to a non-empty value to avoid a false positive
      result.current.onAccept()
    })

    // Then
    expect(result.current.itemToDelete).toEqual(emptyLookup);
  });
});
