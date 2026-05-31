



CREATE PROCEDURE USP_TOWER
(
      @ACTION         VARCHAR(20)

    , @TOWER_ID       INT = NULL

    , @TENANT_ID      INT = NULL

    , @TOWER_NAME     VARCHAR(100) = NULL

    , @TOTAL_FLOORS   INT = NULL

    , @STATUS         VARCHAR(20) = NULL
)
AS
BEGIN

    IF @ACTION = 'GET'
    BEGIN

        SELECT
            *
        FROM TB_TOWERS
        WHERE TENANT_ID =
              @TENANT_ID

    END

    ELSE IF @ACTION = 'INSERT'
    BEGIN

        INSERT INTO TB_TOWERS
        (
            TENANT_ID,
            TOWER_NAME,
            TOTAL_FLOORS,
            STATUS
        )
        VALUES
        (
            @TENANT_ID,
            @TOWER_NAME,
            @TOTAL_FLOORS,
            @STATUS
        )

    END

    ELSE IF @ACTION = 'UPDATE'
    BEGIN

        UPDATE TB_TOWERS
        SET

            TOWER_NAME =
                @TOWER_NAME,

            TOTAL_FLOORS =
                @TOTAL_FLOORS,

            STATUS =
                @STATUS

        WHERE TOWER_ID =
            @TOWER_ID

    END

   ELSE IF @ACTION='DELETE'
BEGIN

    IF EXISTS
    (
        SELECT 1
        FROM TB_FLATS
        WHERE TOWER_ID = @TOWER_ID
    )
    BEGIN

        RAISERROR(
            'Tower contains flats. Delete flats first.',
            16,
            1
        )

        RETURN

    END

    DELETE
    FROM TB_TOWERS
    WHERE
        TOWER_ID = @TOWER_ID
    AND TENANT_ID = @TENANT_ID

END

END