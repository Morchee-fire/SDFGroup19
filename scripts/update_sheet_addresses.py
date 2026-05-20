#!/usr/bin/env python3
"""
Add per-chain contract address columns to the stablecoin Google Sheet.

Auth: uses Application Default Credentials.
Run:  gcloud auth application-default login   (once)
      python3 scripts/update_sheet_addresses.py
"""

import gspread
from google.auth import default

SHEET_ID = "1W6-vyIHYn7_mWmfjcemLRT7nSKZmaBRsd6tDaf09aws"

# Verified contract addresses keyed by ticker then chain name.
# Chain names must match the column headers we will write to the sheet.
CONTRACT_ADDRESSES: dict[str, dict[str, str]] = {
    "AUSD": {
        "Ethereum":        "0x00000000eFE302BEAA2b3e6e1b18d08D69a9012a",
        "Avalanche":       "0x00000000eFE302BEAA2b3e6e1b18d08D69a9012a",
        "Solana":          "AUSD1jCcCyPLybk1YnvPWsHQSrZ46dxwoMbiN4N2UEB9",
        "Sui":             "0x2053d08c1e2bd02791056171aab0fd12bd7cd7efad2ab8f6b9c8902f14df2ff2::ausd::AUSD",
    },
    "BRZ": {
        "Ethereum":  "0x01d33FD36ec67c6Ada32cf36b31e88EE190B1839",
        "Solana":    "FtgGSFADXBtroxq8VCausXRr2of47QBf5AS1NtZCu4GD",
        "Polygon":   "0x4ed141110f6eeeaba9a1df36d8c26f684d2475dc",
        "Base":      "0xE9185Ee218cae427aF7B9764A011bb89FeA761B4",
    },
    "tGBP": {
        "Ethereum":  "0x27f6c8289550fce67f6b50bed1f519966afe5287",
        "Solana":    "2zMqyX4AYCk6mgy5UZ2S7zUaLxwERhK5WjqDzkPPbSpW",
        "Polygon":   "0x27f6c8289550fce67f6b50bed1f519966afe5287",
        "Base":      "0x27f6c8289550fce67f6b50bed1f519966afe5287",
        "BNB Chain": "0x27f6c8289550fce67f6b50bed1f519966afe5287",
        "Avalanche": "0x27f6c8289550fce67f6b50bed1f519966afe5287",
    },
    "JPYC": {
        "Ethereum":  "0xE7C3D8C9a439feDe00D2600032D5dB0Be71C3c29",
        "Avalanche": "0xE7C3D8C9a439feDe00D2600032D5dB0Be71C3c29",
        "Polygon":   "0xE7C3D8C9a439feDe00D2600032D5dB0Be71C3c29",
    },
    "XSGD": {
        "Ethereum":  "0x70e8de73ce538da2beed35d14187f6959a8eca96",
        "Polygon":   "0xDC3326e71D45186F113a2F448984CA0e8D201995",
        "Avalanche": "0xb2F85b7AB3c2b6f62DF06dE6aE7D09c010a5096E",
        "Hedera":    "0.0.1985922",
    },
    "IDRT": {
        "Ethereum":  "0x998FFE1E43fAcffb941dc337dD0468d52bA5b48A",
    },
    "TRYB": {
        "Ethereum":  "0x2c537e5624e4af88a7ae4060c022609376c8d0eb",
        "Avalanche": "0x564A341Df6C126f90cf3ECB92120FD7190ACb401",
        "Solana":    "A94X2fRy3wydNShU4dRaDyap2UuoeWJGWyATtyp61WZf",
        "BNB Chain": "0xC1fdBed7DAc39caE2CCC0748f7A80dC446F6a594",
        "Polygon":   "0x4fB71290Ac171E1d144F7221D882BECaC7196eb5",
    },
    "GYEN": {
        "Ethereum":  "0xC08512927D12348F6620a698105e1BAac6EcD911",
    },
    "AUDD": {
        "Ethereum":    "0x4cce605ed955295432958d8951d0b176c10720d5",
        "Stellar":     "AUDD:GDC7X2MXTYSAKUUGAIQ7J7RPEIM7GXSAIWFYWWH4GLNFECQVJJLB2EEU",
        "XRP Ledger":  "rUN5Zxt3K1AnMRJgEWywDJT8QDMMeLH5ok",
        "Solana":      "AUDDttiEpCydTm7joUMbYddm72jAWXZnCpPZtDoxqBSw",
        "Hedera":      "0x39ceba2b467fa987546000eb5d1373acf1f3a2e1",
        "XDC":         "0x9fe4e6321eeb7c4bc537570f015e4734b15002b8",
        "Base":        "0x449B3317a6d1efb1Bc3ba0700C9EaA4FFFf4Ae65",
        "Redbelly":    "0x54a210e824B0F89dA988E4B5586440aB354f0e46",
    },
    "BRLA": {
        "Polygon":   "0xe6a537a407488807f0bbeb0038b79004f19dddfb",
        "Celo":      "0xfecb3f7c54e2caae9dc6ac9060a822d47e053760",
        "Moonbeam":  "0xfeb25f3fddad13f82c4d6dbc1481516f62236429",
        "Gnosis":    "0xfecb3f7c54e2caae9dc6ac9060a822d47e053760",
        "Ethereum":  "0xfCB34c47f850f452C15EA1B84d51231C38A61783",
    },
    "VCHF": {
        "Ethereum":  "0x79d4f0232A66c4c91b89c76362016A1707CFBF4f",
        "Solana":    "AhhdRu5YZdjVkKR3wbnUDaymVQL2ucjMQ63sZ3LFHsch",
    },
    "BRL1": {
        "Polygon":   "0x5C067C80c00eCd2345b05E83A3e758eF799C40B5",
    },
    "MXNB": {
        "Arbitrum":  "0xF197FFC28c23E0309B5559e7a166f2c6164C80aA",
        "Avalanche": "0xF197FFC28c23E0309B5559e7a166f2c6164C80aA",
        "Ethereum":  "0xF197FFC28c23E0309B5559e7a166f2c6164C80aA",
        "Polygon":   "0xF197FFC28c23E0309B5559e7a166f2c6164C80aA",
    },
    "CADC": {
        "Ethereum":  "0xcaDC0acd4B445166f12d2C07EAc6E2544FbE2Eef",
        "Polygon":   "0x9de41aff9f55219d5bf4359f167d1d0c772a396d",
    },
    "cNGN": {
        "Ethereum":    "0x17CDB2a01e7a34CbB3DD4b83260B05d0274C8dab",
        "BNB Chain":   "0xa8AEA66B361a8d53e8865c62D142167Af28Af058",
        "Polygon":     "0x52828daa48C1a9A06F37500882b42daf0bE04C3B",
        "Base":        "0x46C85152bFe9f96829aA94755D9f915F9B10EF5F",
        "AssetChain":  "0x7923C0f6FA3d1BA6EAFCAedAaD93e737Fd22FC4F",
        "Bantu":       "GD6G2NT7CQHPIYHA52KZHWB6ONNWTSGZOOLTRLRASENM2VWSF6CHYFRX",
    },
    "MXNe": {
        "Base":    "0x269caE7Dc59803e5C596c95756faEeBb6030E0aF",
        "Solana":  "6zYgzrT7X2wi9a9NeMtUvUWLLmf2a8vBsbYkocYdB9wa",
        "Stellar": "MXNe:GCQCNWT22JDLENQAVIE6DRJGHWAQ6EX2H5ABGPV55EJUPPZM5UA7KHZR",
    },
    "ZARP": {
        "Ethereum":  "0xb755506531786C8aC63B756BaB1ac387bACB0C04",
        "Polygon":   "0xb755506531786C8aC63B756BaB1ac387bACB0C04",
    },
    "PHPC": {
        "Ronin":   "0x63c6e9f027947be84d390cfa7b2332d13b529353",
        "Polygon": "0x87a25dc121Db52369F4a9971F664Ae5e372CF69A",
    },
    "TESOURO": {
        "Solana":   "BRNTNaZeTJANz9PeuD8drNbBHwGgg7ZTjiQYrFgWQ48p",
        "Polygon":  "0xd574b191B5a00262Ff19953d3CE25543AB7C8098",
        "Base":     "0x7ceE47e7B7CD04CF984e8Dd86C42595B5771A9B2",
        "Stellar":  "TESOURO:GCRYUGD5NVARGXT56XEZI5CIFCQETYHAPQQTHO2O3IQZTHDH4LATMYWC",
        "Monad":    "0x7A9990ffe3057EDC18558cA4C8804430fe917456",
    },
    "CETES": {
        "Solana":   "CETES7CKqqKQizuSN6iWQwmTeFRjbJR6Vw2XRKfEDR8f",
        "Polygon":  "0x834df4C1d8f51Be24322E39e4766697BE015512F",
        "Base":     "0x834df4C1d8f51Be24322E39e4766697BE015512F",
        "Stellar":  "CETES:GCRYUGD5NVARGXT56XEZI5CIFCQETYHAPQQTHO2O3IQZTHDH4LATMYWC",
        "Monad":    "0x834df4C1d8f51Be24322E39e4766697BE015512F",
    },
    "GILTS": {
        "Solana":   "GiLTSeSFnNse7xQVYeKdMyckGw66AoRmyggGg1NNd4yr",
        "Polygon":  "0x46080F31351A6568f44575E3EFfDE7f0C86867f9",
        "Base":     "0x0ff2CBAfcCAe23A704d954B43910e864291fd03A",
        "Stellar":  "GILTS:GCRYUGD5NVARGXT56XEZI5CIFCQETYHAPQQTHO2O3IQZTHDH4LATMYWC",
        "Monad":    "0x46080F31351A6568f44575E3EFfDE7f0C86867f9",
    },
    "EUROB": {
        "Solana":   "EuroszHk1AL7fHBBsxgeGHsamUqwBpb26oEyt9BcfZ6G",
        "Polygon":  "0xC6221856E45ed806F8325a084bED3D69D32C526d",
        "Base":     "0xC6221856E45ed806F8325a084bED3D69D32C526d",
        "Stellar":  "EUROB:GCRYUGD5NVARGXT56XEZI5CIFCQETYHAPQQTHO2O3IQZTHDH4LATMYWC",
        "Monad":    "0xC6221856E45ed806F8325a084bED3D69D32C526d",
    },
}

# Canonical chain column order for the sheet
CHAINS = [
    "Ethereum", "Polygon", "Solana", "Avalanche", "Base",
    "BNB Chain", "Arbitrum", "Hedera", "Stellar", "XRP Ledger",
    "XDC", "Redbelly", "Monad", "Sui", "Ronin",
    "Celo", "Moonbeam", "Gnosis", "AssetChain", "Bantu",
]


def main() -> None:
    creds, _ = default(scopes=["https://www.googleapis.com/auth/spreadsheets"])
    gc = gspread.authorize(creds)
    ws = gc.open_by_key(SHEET_ID).sheet1

    all_values = ws.get_all_values()
    if not all_values:
        print("Sheet is empty — nothing to do.")
        return

    headers = all_values[0]
    existing_col_count = len(headers)

    # Add chain headers starting at column J (index 9, 1-based = 10)
    header_updates = []
    chain_col_map: dict[str, int] = {}  # chain -> 1-based col index

    for i, chain in enumerate(CHAINS):
        col_1based = existing_col_count + i + 1
        chain_col_map[chain] = col_1based
        cell = gspread.utils.rowcol_to_a1(1, col_1based)
        header_updates.append({"range": cell, "values": [[chain]]})

    # Build address updates for each data row
    addr_updates = []
    for row_idx, row in enumerate(all_values[1:], start=2):
        ticker = row[1].strip() if len(row) > 1 else ""
        if ticker not in CONTRACT_ADDRESSES:
            continue
        for chain, addr in CONTRACT_ADDRESSES[ticker].items():
            if chain not in chain_col_map:
                continue
            cell = gspread.utils.rowcol_to_a1(row_idx, chain_col_map[chain])
            addr_updates.append({"range": cell, "values": [[addr]]})

    all_updates = header_updates + addr_updates
    if all_updates:
        ws.batch_update(all_updates, value_input_option="RAW")
        print(f"Done — wrote {len(header_updates)} headers and {len(addr_updates)} addresses.")
    else:
        print("No updates needed.")


if __name__ == "__main__":
    main()
